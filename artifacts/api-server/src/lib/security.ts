import dns from "node:dns/promises";
import ipaddr from "ipaddr.js";

const BLOCKED_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "::1",
  "0.0.0.0",
  "169.254.169.254", // Cloud metadata
  "metadata.google.internal",
  "instance-data",
]);

/**
 * Validates that a URL is safe to fetch and not attempting SSRF.
 */
export async function validateSafeUrl(urlString: string): Promise<{ valid: boolean; error?: string; url?: URL }> {
  try {
    const parsed = new URL(urlString);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { valid: false, error: "Only HTTP and HTTPS protocols are permitted." };
    }

    const hostname = parsed.hostname.toLowerCase();

    if (BLOCKED_HOSTS.has(hostname)) {
      return { valid: false, error: "Access to internal or private endpoints is blocked." };
    }

    // Check if hostname is direct IP
    if (ipaddr.isValid(hostname)) {
      const addr = ipaddr.parse(hostname);
      const range = addr.range();
      if (
        range === "loopback" ||
        range === "private" ||
        range === "linkLocal" ||
        range === "uniqueLocal" ||
        range === "broadcast" ||
        range === "carrierGradeNat"
      ) {
        return { valid: false, error: "Access to private or internal IP ranges is strictly prohibited." };
      }
    } else {
      // Resolve DNS to verify IP
      try {
        const lookup = await dns.lookup(hostname);
        if (ipaddr.isValid(lookup.address)) {
          const addr = ipaddr.parse(lookup.address);
          const range = addr.range();
          if (
            range === "loopback" ||
            range === "private" ||
            range === "linkLocal" ||
            range === "uniqueLocal" ||
            range === "broadcast"
          ) {
            return { valid: false, error: "Resolved IP address belongs to a private network." };
          }
        }
      } catch {
        return { valid: false, error: "Unable to resolve destination hostname." };
      }
    }

    return { valid: true, url: parsed };
  } catch {
    return { valid: false, error: "Malformed URL provided." };
  }
}

/**
 * Sanitizes filenames to eliminate directory traversal and forbidden filesystem characters.
 */
export function sanitizeFilename(filename: string, defaultExt = "mp4"): string {
  // Strip null bytes, paths
  const base = filename.replace(/\0/g, "").replace(/\\/g, "/").split("/").pop() || "media";
  // Remove dangerous chars
  const sanitized = base.replace(/[^a-zA-Z0-9._-]/g, "_").substring(0, 120);

  if (!sanitized || sanitized === "." || sanitized === "..") {
    return `media_${Date.now()}.${defaultExt}`;
  }

  return sanitized;
}
