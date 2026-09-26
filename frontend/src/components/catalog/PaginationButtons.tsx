import Link from "next/link";

type TPaginationBase = {
  totalPages: number;
  currentPage: number;
};

/** Navegando el catálogo: cada página es una URL real. */
type TLinkPagination = TPaginationBase & {
  category: string;
  isAdmin?: boolean;
  onPageChange?: never;
};

/** Buscando: las páginas viven en estado de React Query, no en la URL. */
type TButtonPagination = TPaginationBase & {
  onPageChange: (page: number) => void;
  category?: never;
  isAdmin?: never;
};

export type TPaginationButtonsProps = TLinkPagination | TButtonPagination;

const buttonBase = "px-4 py-1.5 text-xs lg:text-sm font-medium rounded-lg";
const arrowBase = "px-4 py-1 text-xs lg:text-sm font-medium rounded-lg";
const activeStyle = "bg-[#9F531B] text-[#EEEEEF] hover:bg-[#7C3E13]";
const inactiveStyle = "bg-transparent border border-[#9F531B] text-[#1A1615]/75 hover:bg-[#9F531B] hover:text-[#EEEEEF] transition";
const disabledStyle = "bg-[#9F531B]/50 text-[#EEEEEF]/50 cursor-not-allowed";

/** Ventana de 5 páginas que se mueve con la página actual. */
const getPageRange = (currentPage: number, totalPages: number) => {
  if (totalPages <= 5) {
    return { startPage: 1, endPage: totalPages };
  }

  if (currentPage <= 3) {
    return { startPage: 1, endPage: 5 };
  }

  if (currentPage + 2 >= totalPages) {
    return { startPage: totalPages - 4, endPage: totalPages };
  }

  return { startPage: currentPage - 2, endPage: currentPage + 2 };
};

export const PaginationButtons = (props: TPaginationButtonsProps) => {
  const { totalPages, currentPage } = props;

  if (totalPages <= 1) return null;

  const { startPage, endPage } = getPageRange(currentPage, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  /** En modo enlace navega por URL; en modo botón solo cambia el estado. */
  const renderItem = (page: number, className: string, label: string, content: React.ReactNode) => {
    if (props.onPageChange) {
      return (
        <button
          type="button"
          onClick={() => props.onPageChange(page)}
          aria-label={label}
          aria-current={currentPage === page ? "page" : undefined}
          className={`${className} cursor-pointer`}
        >
          {content}
        </button>
      );
    }

    const base = props.isAdmin ? "/admin/catalogo" : "/catalogo";

    return (
      <Link
        href={`${base}/${props.category}/${page}`}
        aria-label={label}
        aria-current={currentPage === page ? "page" : undefined}
        className={className}
      >
        {content}
      </Link>
    );
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-8" aria-label="Paginación del catálogo">
      {/* Botón anterior */}
      {isFirst ? (
        <span aria-hidden="true" className={`${arrowBase} ${disabledStyle}`}>&lt;</span>
      ) : (
        renderItem(currentPage - 1, `${arrowBase} ${activeStyle}`, "Página anterior", <span aria-hidden="true">&lt;</span>)
      )}

      {/* Botones de página */}
      {pageNumbers.map((page) =>
        <span key={page}>
          {renderItem(
            page,
            `${buttonBase} ${currentPage === page ? activeStyle : inactiveStyle}`,
            `Ir a la página ${page}`,
            page,
          )}
        </span>
      )}

      {/* Botón siguiente */}
      {isLast ? (
        <span aria-hidden="true" className={`${arrowBase} ${disabledStyle}`}>&gt;</span>
      ) : (
        renderItem(currentPage + 1, `${arrowBase} ${activeStyle}`, "Página siguiente", <span aria-hidden="true">&gt;</span>)
      )}
    </nav>
  );
};
