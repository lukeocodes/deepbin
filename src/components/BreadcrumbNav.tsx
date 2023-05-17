import type { Navigation, NavigationPage } from "@/types/navigation";
import { HomeIcon } from "@heroicons/react/20/solid";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const BreadcrumbHome = ({ page }: { page: NavigationPage }) => {
  return (
    <li className="flex min-h-[3em]">
      <div className="flex items-center">
        <Link
          href={page.href}
          className="text-zinc-400 hover:text-zinc-500"
          aria-current={page.current ? "page" : undefined}
        >
          <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <span className="sr-only">{page.name}</span>
        </Link>
      </div>
    </li>
  );
};

const Breadcrumb = ({ page }: { page: NavigationPage }) => {
  return (
    <li className="flex min-h-[3em]">
      <div className="flex items-center">
        <ChevronDoubleRightIcon className="stroke-zinc-500 w-5 h-5" />
        <Link
          href={page.href}
          className="ml-4 text-sm text-zinc-200 hover:text-zinc-300"
          aria-current={page.current ? "page" : undefined}
        >
          {page.name}
        </Link>
      </div>
    </li>
  );
};

const BreadcrumbNav = ({
  pages,
  home,
}: {
  pages: Navigation;
  home: NavigationPage;
}) => {
  return (
    <nav
      className="flex border-b border-zinc-700  bg-zinc-800/80"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="mx-auto flex w-full space-x-4 px-4 sm:px-6 lg:px-8"
      >
        {pages.map((page, i) => {
          if (page === home) {
            return <BreadcrumbHome key={i} page={page} />;
          } else {
            return <Breadcrumb key={i} page={page} />;
          }
        })}

        {home.current && <Breadcrumb page={home} />}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
