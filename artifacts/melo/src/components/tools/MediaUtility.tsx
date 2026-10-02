import React, { useState, useEffect, useRef } from "react";
import {
  Download,
  Video,
  Music,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  FileCheck,
  ShieldCheck,
  Minimize2,
  Scissors,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface MediaJob {
  id: string;
  status: "queued" | "downloading" | "probing" | "converting" | "complete" | "error";
  progress: number;
  filename: string;
  expiresAt: string;
  error?: string;
  downloadUrl?: string;
  outputBytes?: number;
}

interface MediaUtilityProps {
  initialTab?: "url" | "video" | "audio" | "compress";
  initialFormat?: string;
  customTitle?: string;
  customDescription?: string;
}

export function MediaUtility({
  initialTab = "url",
  initialFormat = "original",
  customTitle,
  customDescription,
}: MediaUtilityProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // URL state
  const [urlInput, setUrlInput] = useState<string>("");
  const [urlFormat, setUrlFormat] = useState<string>(initialFormat);
  const [urlQuality, setUrlQuality] = useState<"high" | "balanced" | "small">("high");
  const [hasPermission, setHasPermission] = useState<boolean>(true);
  const [isSubmittingUrl, setIsSubmittingUrl] = useState<boolean>(false);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadFormat, setUploadFormat] = useState<string>(initialFormat === "original" ? "mp4" : initialFormat);
  const [uploadQuality, setUploadQuality] = useState<"high" | "balanced" | "small">("high");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Global messages & jobs
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [jobs, setJobs] = useState<MediaJob[]>(() => {
    try {
      const saved = localStorage.getItem("melo_jobs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist jobs
  useEffect(() => {
    try {
      localStorage.setItem("melo_jobs", JSON.stringify(jobs.slice(0, 20)));
    } catch {
      // ignore
    }
  }, [jobs]);

  // Sync initial tab and format when props change
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
    if (initialFormat) {
      setUrlFormat(initialFormat);
      setUploadFormat(initialFormat === "original" ? "mp4" : initialFormat);
    }
  }, [initialTab, initialFormat]);

  // Polling for active jobs
  useEffect(() => {
    const activeJobs = jobs.filter((j) => j.status !== "complete" && j.status !== "error");
    if (activeJobs.length === 0) return;

    const interval = setInterval(async () => {
      for (const activeJob of activeJobs) {
        try {
          const res = await fetch(`/api/media/jobs/${activeJob.id}`);
          if (res.ok) {
            const updated: MediaJob = await res.json();
            setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
          } else if (res.status === 404) {
            setJobs((prev) =>
              prev.map((j) =>
                j.id === activeJob.id ? { ...j, status: "error", error: "Job expired" } : j
              )
            );
          }
        } catch {
          // ignore
        }
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [jobs]);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmed = urlInput.trim();
    if (!trimmed) {
      setErrorMessage("Please enter a valid direct media URL.");
      return;
    }

    if (!hasPermission) {
      setErrorMessage("Please confirm you have permission to download this media.");
      return;
    }

    try {
      setIsSubmittingUrl(true);
      const res = await fetch("/api/media/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: trimmed,
          format: urlFormat,
          quality: urlQuality,
          permission: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server returned error (${res.status})`);
      }

      const job: MediaJob = await res.json();
      setJobs((prev) => [job, ...prev.filter((j) => j.id !== job.id)]);
      setUrlInput("");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initiate download job.");
    } finally {
      setIsSubmittingUrl(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent, overrideFormat?: string, overrideQuality?: string) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedFile) {
      setErrorMessage("Please select or drop a video or audio file first.");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("format", overrideFormat || uploadFormat);
      formData.append("quality", overrideQuality || uploadQuality);
      formData.append("permission", "true");

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server returned error (${res.status})`);
      }

      const job: MediaJob = await res.json();
      setJobs((prev) => [job, ...prev.filter((j) => j.id !== job.id)]);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to process media file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await fetch(`/api/media/jobs/${id}`, { method: "DELETE" });
    } catch {
      // ignore
    }
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getStatusBadge = (status: MediaJob["status"]) => {
    switch (status) {
      case "queued":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Queued</Badge>;
      case "downloading":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 animate-pulse">Downloading</Badge>;
      case "probing":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Analyzing</Badge>;
      case "converting":
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse">Processing</Badge>;
      case "complete":
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Completed</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
    }
  };

  return (
    <div className="w-full">
      {errorMessage && (
        <Alert variant="destructive" className="mb-6 animate-in fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs underline font-semibold ml-4 hover:opacity-80"
            >
              Dismiss
            </button>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Mode Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 p-1.5 bg-slate-200/75 rounded-2xl mb-6">
          <TabsTrigger value="url" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold text-xs sm:text-sm flex items-center justify-center gap-2">
            <Download className="h-4 w-4 text-indigo-600" />
            Download URL
          </TabsTrigger>
          <TabsTrigger value="video" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold text-xs sm:text-sm flex items-center justify-center gap-2">
            <Video className="h-4 w-4 text-blue-600" />
            Convert Video
          </TabsTrigger>
          <TabsTrigger value="audio" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold text-xs sm:text-sm flex items-center justify-center gap-2">
            <Music className="h-4 w-4 text-violet-600" />
            Convert Audio
          </TabsTrigger>
          <TabsTrigger value="compress" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold text-xs sm:text-sm flex items-center justify-center gap-2">
            <Minimize2 className="h-4 w-4 text-emerald-600" />
            Compress Video
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Download Media via URL */}
        <TabsContent value="url">
          <Card className="border-slate-200/90 shadow-sm bg-white overflow-hidden rounded-2xl">
            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/40">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
                <Download className="h-5 w-5 text-indigo-600" />
                {customTitle || "Direct Media Downloader"}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-500">
                {customDescription || "Paste a direct video or audio link to download and convert immediately."}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleUrlSubmit}>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="media-url-input" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Direct Media URL
                  </Label>
                  <div className="relative">
                    <Input
                      id="media-url-input"
                      type="url"
                      placeholder="https://example.com/permitted-media.mp4"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="h-13 pl-4 pr-16 text-sm bg-slate-50/50 border-slate-300 focus-visible:ring-indigo-500 rounded-xl"
                    />
                    {urlInput && (
                      <button
                        type="button"
                        onClick={() => setUrlInput("")}
                        className="absolute right-3.5 top-4 text-slate-400 hover:text-slate-600 text-xs px-2 py-0.5 rounded-md bg-slate-200/60"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Supports direct MP4, WebM, MOV, and MP3 media links with valid file permissions.
                  </p>
                </div>

                {/* Format selection */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Target Format
                  </Label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      { id: "original", label: "Original", type: "Direct" },
                      { id: "mp4", label: "MP4", type: "Video" },
                      { id: "mp3", label: "MP3", type: "Audio" },
                      { id: "wav", label: "WAV", type: "Audio" },
                      { id: "webm", label: "WebM", type: "Video" },
                      { id: "m4a", label: "M4A", type: "Audio" },
                    ].map((f) => {
                      const isSelected = urlFormat === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setUrlFormat(f.id)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all ${
                            isSelected
                              ? "bg-indigo-50/90 border-indigo-500 text-indigo-700 ring-2 ring-indigo-500/20 shadow-xs"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span className="font-bold">{f.label}</span>
                          <span className="text-[10px] text-slate-400 font-normal mt-0.5">{f.type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quality presets */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Quality Preset
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "high", title: "High Quality", desc: "Best bitrate & original resolution" },
                      { id: "balanced", title: "Balanced", desc: "Optimal balance of size & speed" },
                      { id: "small", title: "Compact", desc: "Smallest size for mobile sharing" },
                    ].map((q) => {
                      const isSelected = urlQuality === q.id;
                      return (
                        <div
                          key={q.id}
                          onClick={() => setUrlQuality(q.id as any)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? "bg-indigo-50/80 border-indigo-500 text-indigo-900 ring-1 ring-indigo-500/20"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="font-bold text-xs">{q.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{q.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rights confirmation */}
                <div className="flex items-start space-x-2 pt-1">
                  <Checkbox
                    id="rights-check-url"
                    checked={hasPermission}
                    onCheckedChange={(v) => setHasPermission(Boolean(v))}
                    className="mt-0.5 border-slate-300 data-[state=checked]:bg-indigo-600"
                  />
                  <Label
                    htmlFor="rights-check-url"
                    className="text-xs text-slate-500 font-normal leading-relaxed cursor-pointer"
                  >
                    I certify that I have the required rights or permission to process and download this media.
                  </Label>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Free, secure & TLS 1.3 encrypted
                </span>
                <Button
                  type="submit"
                  disabled={isSubmittingUrl || !urlInput.trim()}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 h-11 rounded-xl shadow-sm shadow-indigo-600/25"
                >
                  {isSubmittingUrl ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Start Download
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Tab 2: Convert Video (Upload) */}
        <TabsContent value="video">
          <Card className="border-slate-200/90 shadow-sm bg-white overflow-hidden rounded-2xl">
            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/40">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
                <Video className="h-5 w-5 text-blue-600" />
                Video Converter
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-500">
                Upload MP4, MOV, WEBM, MKV, or AVI to convert to universal formats with lossless video clarity.
              </CardDescription>
            </CardHeader>
            <form onSubmit={(e) => handleFileUpload(e)}>
              <CardContent className="space-y-6 pt-6">
                {/* Upload box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    selectedFile
                      ? "border-blue-400 bg-blue-50/30"
                      : "border-slate-300 hover:border-blue-400 hover:bg-slate-50/60"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*,.mp4,.mov,.webm,.mkv,.avi,.flv,.m4v"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                  {selectedFile ? (
                    <div className="space-y-2">
                      <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                        <FileCheck className="h-6 w-6" />
                      </div>
                      <div className="font-bold text-slate-800 text-sm">{selectedFile.name}</div>
                      <div className="text-xs text-slate-500">
                        {formatFileSize(selectedFile.size)} • Click to choose a different file
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                        <UploadCloud className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="font-bold text-slate-800 text-sm">
                        Click or drag & drop video file here
                      </div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Supports MP4, MOV, WEBM, MKV, AVI up to 100MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Target video formats */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Convert To
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "mp4", label: "MP4 Video", desc: "Universal playback" },
                      { id: "webm", label: "WebM Video", desc: "Modern web standard" },
                      { id: "mov", label: "MOV Video", desc: "Apple QuickTime" },
                      { id: "mp3", label: "Extract MP3", desc: "Pure audio track" },
                    ].map((f) => {
                      const isSelected = uploadFormat === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setUploadFormat(f.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "bg-blue-50/90 border-blue-500 text-blue-900 ring-2 ring-blue-500/20"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="font-bold text-xs">{f.label}</div>
                          <div className="text-[10px] text-slate-500">{f.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6">
                <span className="text-xs text-slate-500">Processed securely in temporary isolation</span>
                <Button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-11 rounded-xl shadow-sm shadow-blue-600/25"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Converting Video...
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-4 w-4" />
                      Convert Video Now
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Tab 3: Convert Audio */}
        <TabsContent value="audio">
          <Card className="border-slate-200/90 shadow-sm bg-white overflow-hidden rounded-2xl">
            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/40">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
                <Music className="h-5 w-5 text-violet-600" />
                Audio Converter & Extractor
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-500">
                Convert audio tracks or extract music and speech from video files into MP3, WAV, or M4A.
              </CardDescription>
            </CardHeader>
            <form onSubmit={(e) => handleFileUpload(e, uploadFormat)}>
              <CardContent className="space-y-6 pt-6">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    selectedFile
                      ? "border-violet-400 bg-violet-50/30"
                      : "border-slate-300 hover:border-violet-400 hover:bg-slate-50/60"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*,video/*,.mp3,.wav,.m4a,.flac,.ogg,.mp4,.mov,.webm"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                  {selectedFile ? (
                    <div className="space-y-2">
                      <div className="h-12 w-12 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mx-auto">
                        <Music className="h-6 w-6" />
                      </div>
                      <div className="font-bold text-slate-800 text-sm">{selectedFile.name}</div>
                      <div className="text-xs text-slate-500">
                        {formatFileSize(selectedFile.size)} • Click to choose a different file
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                        <UploadCloud className="h-6 w-6 text-violet-600" />
                      </div>
                      <div className="font-bold text-slate-800 text-sm">
                        Select audio or video file
                      </div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        MP3, WAV, M4A, FLAC, OGG, or MP4 video for audio extraction
                      </p>
                    </div>
                  )}
                </div>

                {/* Target audio format */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Target Audio Format
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "mp3", label: "MP3 Audio", desc: "320kbps High Fidelity" },
                      { id: "wav", label: "WAV Audio", desc: "Lossless Studio PCM" },
                      { id: "m4a", label: "M4A Audio", desc: "Apple AAC Audio" },
                      { id: "webm", label: "WebM Audio", desc: "Opus Web Audio" },
                    ].map((f) => {
                      const isSelected = uploadFormat === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setUploadFormat(f.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "bg-violet-50/90 border-violet-500 text-violet-900 ring-2 ring-violet-500/20"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="font-bold text-xs">{f.label}</div>
                          <div className="text-[10px] text-slate-500">{f.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6">
                <span className="text-xs text-slate-500">Extracts crystal-clear sound channels</span>
                <Button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 h-11 rounded-xl shadow-sm shadow-violet-600/25"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Extracting Audio...
                    </>
                  ) : (
                    <>
                      <Music className="mr-2 h-4 w-4" />
                      Convert to Audio
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Tab 4: Compress Video */}
        <TabsContent value="compress">
          <Card className="border-slate-200/90 shadow-sm bg-white overflow-hidden rounded-2xl">
            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/40">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
                <Minimize2 className="h-5 w-5 text-emerald-600" />
                Video Compressor
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-500">
                Shrink video file sizes for WhatsApp, email attachments, and Discord without significant quality loss.
              </CardDescription>
            </CardHeader>
            <form onSubmit={(e) => handleFileUpload(e, "mp4", uploadQuality)}>
              <CardContent className="space-y-6 pt-6">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    selectedFile
                      ? "border-emerald-400 bg-emerald-50/30"
                      : "border-slate-300 hover:border-emerald-400 hover:bg-slate-50/60"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*,.mp4,.mov,.webm,.mkv,.avi"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                  {selectedFile ? (
                    <div className="space-y-2">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <Minimize2 className="h-6 w-6" />
                      </div>
                      <div className="font-bold text-slate-800 text-sm">{selectedFile.name}</div>
                      <div className="text-xs text-slate-500">
                        Current Size: {formatFileSize(selectedFile.size)} • Click to choose a different file
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                        <UploadCloud className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div className="font-bold text-slate-800 text-sm">
                        Select video file to compress
                      </div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Supports MP4, MOV, WEBM, MKV, AVI up to 100MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Compression level options */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Compression Level
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "balanced",
                        title: "Balanced (~30% smaller)",
                        desc: "Great quality, ideal for regular sharing",
                      },
                      {
                        id: "small",
                        title: "Maximum (~50% smaller)",
                        desc: "Fits WhatsApp (16MB) and Gmail (25MB)",
                      },
                      {
                        id: "high",
                        title: "Subtle (~15% smaller)",
                        desc: "Preserves almost 100% of original visual sharpness",
                      },
                    ].map((q) => {
                      const isSelected = uploadQuality === q.id;
                      return (
                        <div
                          key={q.id}
                          onClick={() => setUploadQuality(q.id as any)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? "bg-emerald-50/90 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="font-bold text-xs">{q.title}</div>
                          <div className="text-[11px] text-slate-500 mt-1">{q.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6">
                <span className="text-xs text-slate-500">Smart rate control maintains crisp text & details</span>
                <Button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 h-11 rounded-xl shadow-sm shadow-emerald-600/25"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Compressing Video...
                    </>
                  ) : (
                    <>
                      <Minimize2 className="mr-2 h-4 w-4" />
                      Compress Video Now
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Task & Download Queue Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-indigo-600" />
              Download & Conversion Queue ({jobs.length})
            </h3>
            <p className="text-xs text-slate-500">Files ready for immediate download</p>
          </div>
          {jobs.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setJobs([])}
              className="text-xs text-slate-500 hover:text-rose-600"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Clear Queue
            </Button>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center bg-white">
            <Video className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">Your task queue is empty</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Select a file or paste a link above. When processing finishes, your download link will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => {
              const isDone = job.status === "complete";
              const isFailed = job.status === "error";
              const isWorking = !isDone && !isFailed;

              return (
                <div
                  key={job.id}
                  className="border border-slate-200/90 rounded-xl p-4 bg-white shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${
                          isDone
                            ? "bg-emerald-100 text-emerald-700"
                            : isFailed
                            ? "bg-rose-100 text-rose-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {isWorking ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : isDone ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <AlertCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-900 truncate">
                          {job.filename}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                          {getStatusBadge(job.status)}
                          {job.outputBytes ? (
                            <span>• {formatFileSize(job.outputBytes)}</span>
                          ) : null}
                          <span>• Expires in 60m</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isDone && (
                        <a
                          href={`/api/media/jobs/${job.id}/download`}
                          download={job.filename}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download File
                        </a>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteJob(job.id)}
                        className="h-8 w-8 text-slate-400 hover:text-rose-600"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {isWorking && (
                    <div className="mt-3 space-y-1.5">
                      <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                        <span className="capitalize">{job.status}...</span>
                        <span>{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} className="h-1.5 bg-slate-100" />
                    </div>
                  )}

                  {/* Error message */}
                  {isFailed && job.error && (
                    <p className="mt-2 text-xs text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200/60">
                      {job.error}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
