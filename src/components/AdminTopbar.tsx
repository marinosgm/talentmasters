import Link from "next/link";

export default function AdminTopbar({ email }: { email?: string | null }) {
  return (
    <div className="sticky top-0 z-[60] border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-200">
            Admin Mode
          </span>

          <nav className="hidden sm:flex items-center gap-2">
            <Link
              href="/admin/jobs"
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80 hover:bg-white/[0.06]"
            >
              Jobs
            </Link>
            <Link
              href="/admin/jobs/new"
              className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold text-black hover:opacity-90"
            >
              + New Job
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {email ? (
            <span className="hidden sm:inline text-xs text-white/50">
              {email}
            </span>
          ) : null}

          <form action="/admin/logout" method="post">
            <button className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.06] hover:text-orange-300">
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* Mobile quick actions */}
      <div className="border-t border-white/10 sm:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 px-4 py-2">
          <Link
            href="/admin/jobs"
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-center text-xs text-white/80"
          >
            Jobs
          </Link>
          <Link
            href="/admin/jobs/new"
            className="flex-1 rounded-xl bg-orange-500 px-3 py-2 text-center text-xs font-semibold text-black"
          >
            + New
          </Link>
        </div>
      </div>
    </div>
  );
}
