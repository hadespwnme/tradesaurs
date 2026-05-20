"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpenText,
  ChevronDown,
  Lock,
  PlayCircle,
} from "lucide-react";
import { NeoCard } from "@/components/neo-card";
import { cn } from "@/lib/utils";
import {
  getTradersFamilyEmbedUrl,
  getTradersFamilyWatchUrl,
  tradersFamilyModules,
  tradersFamilySessionEntries,
} from "@/lib/traders-family";
import { TradersFamilyCourseSkeleton } from "@/components/page-skeletons";

const STORAGE_KEY = "tradesaur:traders-family-progress";
const sessionById = new Map(
  tradersFamilySessionEntries.map((entry) => [entry.id, entry])
);

type ProgressState = {
  currentIndex: number;
  moduleLimits: Record<string, number>;
};

function clampIndex(index: number) {
  return Math.min(
    Math.max(index, 0),
    Math.max(tradersFamilySessionEntries.length - 1, 0)
  );
}

function getProgressLabel(
  sessionIndex: number,
  currentIndex: number,
  isClickable: boolean
) {
  if (sessionIndex === currentIndex) return "Aktif";
  if (isClickable) return "Terbuka";

  return "Terkunci";
}

function getInitialModuleLimits() {
  return Object.fromEntries(
    tradersFamilyModules.map((module) => [module.id, module.sessions.length - 1])
  );
}

function getEffectiveModuleLimit(
  moduleId: string,
  moduleIndex: number,
  sessionCount: number,
  currentModuleIndex: number,
  moduleLimits: Record<string, number>
) {
  if (moduleIndex < currentModuleIndex) {
    return sessionCount - 1;
  }

  return Math.min(
    Math.max(moduleLimits[moduleId] ?? sessionCount - 1, 0),
    sessionCount - 1
  );
}

export function TradersFamilyCourse() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moduleLimits, setModuleLimits] = useState<Record<string, number>>(
    getInitialModuleLimits
  );
  const [openModuleId, setOpenModuleId] = useState<string | undefined>(
    tradersFamilyModules[0]?.id
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);

      if (storedValue) {
        const parsed = JSON.parse(storedValue) as Partial<ProgressState>;
        const nextCurrent = clampIndex(parsed.currentIndex ?? 0);
        const currentSession = tradersFamilySessionEntries[nextCurrent];
        const nextModuleLimits = getInitialModuleLimits();

        for (const module of tradersFamilyModules) {
          const savedLimit = parsed.moduleLimits?.[module.id];

          if (typeof savedLimit === "number") {
            nextModuleLimits[module.id] = Math.min(
              Math.max(savedLimit, 0),
              module.sessions.length - 1
            );
          }
        }

        setModuleLimits(nextModuleLimits);
        setCurrentIndex(nextCurrent);
        setOpenModuleId(currentSession?.moduleId ?? tradersFamilyModules[0]?.id);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const payload: ProgressState = {
      currentIndex,
      moduleLimits,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [currentIndex, isHydrated, moduleLimits]);

  const currentSession = tradersFamilySessionEntries[currentIndex];
  const currentModule = tradersFamilyModules[currentSession.moduleIndex];
  const isLastSessionInModule =
    currentSession.sessionIndex === currentModule.sessions.length - 1;
  const nextSession = isLastSessionInModule
    ? tradersFamilySessionEntries[currentIndex + 1]
    : tradersFamilySessionEntries[currentIndex + 1];

  if (!isHydrated) {
    return <TradersFamilyCourseSkeleton />;
  }

  function handleSelectSession(index: number) {
    const session = tradersFamilySessionEntries[index];
    const module = tradersFamilyModules[session.moduleIndex];
    const moduleLimit = getEffectiveModuleLimit(
      session.moduleId,
      session.moduleIndex,
      module.sessions.length,
      currentSession.moduleIndex,
      moduleLimits
    );

    if (session.sessionIndex > moduleLimit) return;

    setCurrentIndex(index);
    setOpenModuleId(session.moduleId);
    setModuleLimits((value) => ({
      ...value,
      [session.moduleId]: session.sessionIndex,
    }));
  }

  function handleContinue() {
    if (!nextSession) return;

    setModuleLimits((value) => ({
      ...value,
      [nextSession.moduleId]:
        nextSession.moduleId === currentSession.moduleId
          ? Math.max(value[nextSession.moduleId] ?? 0, nextSession.sessionIndex)
          : Math.min(value[nextSession.moduleId] ?? 0, nextSession.sessionIndex),
    }));
    setCurrentIndex(currentIndex + 1);
    setOpenModuleId(nextSession.moduleId);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
      <NeoCard className="overflow-hidden p-0">
        <div className="border-b-2 border-border bg-success px-5 py-4 text-success-foreground">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em]">
                Video Aktif
              </p>
              <h2 className="mt-1 text-xl font-extrabold sm:text-2xl">
                {currentSession.title}
              </h2>
            </div>
            <div className="rounded-[10px] border-2 border-border bg-card px-3 py-2 text-sm font-bold text-card-foreground">
              {currentIndex + 1} / {tradersFamilySessionEntries.length}
            </div>
          </div>
        </div>

        <div className="bg-black">
          <div className="aspect-video">
            <iframe
              key={currentSession.id}
              src={getTradersFamilyEmbedUrl(currentSession.videoId)}
              title={currentSession.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-[10px] border-2 border-border bg-muted px-3 py-2 text-sm font-bold">
              <BookOpenText size={16} strokeWidth={2.5} />
              {currentSession.moduleTitle}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!nextSession}
              className={cn(
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] border-2 border-border px-4 py-3 text-sm font-extrabold transition-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                nextSession
                  ? "neo-shadow-sm neo-press bg-success text-success-foreground cursor-pointer"
                  : "bg-muted text-muted-foreground opacity-70 cursor-not-allowed"
              )}
            >
              {nextSession ? (
                <>
                  Berikutnya <ArrowRight size={16} />
                </>
              ) : (
                "Sesi terakhir"
              )}
            </button>

            <a
              href={getTradersFamilyWatchUrl(currentSession.videoId)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] border-2 border-border bg-card px-4 py-3 text-sm font-extrabold neo-shadow-sm neo-press cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Buka di YouTube <PlayCircle size={16} />
            </a>
          </div>
        </div>
      </NeoCard>

      <aside>
        <div className="space-y-3">
          {tradersFamilyModules.map((module, moduleIndex) => {
            const isOpen = openModuleId === module.id;
            const moduleLimit = getEffectiveModuleLimit(
              module.id,
              moduleIndex,
              module.sessions.length,
              currentSession.moduleIndex,
              moduleLimits
            );
            const availableSessions = Math.min(
              moduleLimit + 1,
              module.sessions.length
            );

            return (
              <div
                key={module.id}
                className="overflow-hidden rounded-[14px] border-2 border-border bg-card neo-shadow"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${module.id}-content`}
                  onClick={() => setOpenModuleId(isOpen ? undefined : module.id)}
                  className="flex w-full items-center justify-between gap-4 bg-card px-4 py-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                      Modul {moduleIndex + 1}
                    </p>
                    <h3 className="mt-1 text-base font-extrabold sm:text-lg">
                      {module.title}
                    </h3>
                    <p className="mt-2 text-xs font-bold text-muted-foreground">
                      {availableSessions}/{module.sessions.length}
                    </p>
                  </div>
                  <ChevronDown
                    size={20}
                    strokeWidth={2.5}
                    className={cn(
                      "shrink-0 transition-transform",
                      isOpen ? "rotate-180" : ""
                    )}
                  />
                </button>

                {isOpen ? (
                  <div
                    id={`${module.id}-content`}
                    role="region"
                    className="border-t-2 border-border bg-muted/60 p-3"
                  >
                    <div className="space-y-2">
                      {module.sessions.map((session) => {
                        const entry = sessionById.get(session.id);

                        if (!entry) return null;

                        const isClickable = entry.sessionIndex <= moduleLimit;
                        const isActive = entry.orderIndex === currentIndex;

                        return (
                          <button
                            key={session.id}
                            type="button"
                            disabled={!isClickable}
                            aria-current={isActive ? "step" : undefined}
                            onClick={() => handleSelectSession(entry.orderIndex)}
                            className={cn(
                              "flex min-h-11 w-full items-center justify-between gap-3 rounded-[12px] border-2 border-border px-3 py-3 text-left text-sm font-bold transition-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                              isActive &&
                                "bg-success text-success-foreground neo-shadow-sm",
                              !isActive &&
                                isClickable &&
                                "bg-card text-card-foreground neo-shadow-sm neo-press cursor-pointer",
                              !isClickable &&
                                "cursor-not-allowed bg-muted text-muted-foreground opacity-70"
                            )}
                          >
                            <span className="flex items-center gap-3">
                              {isClickable ? (
                                <PlayCircle size={18} strokeWidth={2.5} />
                              ) : (
                                <Lock size={18} strokeWidth={2.5} />
                              )}
                              <span>{session.title}</span>
                            </span>
                            <span className="shrink-0 text-[11px] uppercase tracking-[0.2em]">
                              {getProgressLabel(
                                entry.orderIndex,
                                currentIndex,
                                isClickable
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
