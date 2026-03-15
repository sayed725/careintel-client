"use client";

import DataTable from "@/components/shared/table/DataTable";

import { getAllSpecialties, getDoctors } from "@/services/doctor.services";
import { PaginationMeta } from "@/types/api.types";
import { IDoctor } from "@/types/doctor.types";
import { ISpecialty } from "@/types/specialty.types";
import { useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { doctorColumns } from "./doctorsColumns";
import { DataTableFilterConfig, DataTableFilterValue, DataTableFilterValues, DataTableRangeValue } from "@/components/shared/table/DataTableFilters";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SPECIALTIES_FILTER_KEY = "specialties.specialty.title";

const parsePositiveInteger = (
  value: string | null,
  fallbackValue: number,
): number => {
  if (!value) {
    return fallbackValue;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return fallbackValue;
  }

  return parsed;
};


const DoctorsTable = ({ initialQueryString }: { initialQueryString: string }) => {

    // const doctorColumns : ColumnDef<IDoctor>[] = [
    //   { accessorKey: "name", header: "Name"},
    // //   { accessorKey: "specialization", header: "Specialization" },
    //   { accessorKey: "experience", header: "Experience" },
    // //   { accessorKey: "rating", header: "Rating" },
    // ];

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isSortingTransitionPending, startSortingTransition] = useTransition();

    const queryStringFromUrl = useMemo(() => searchParams.toString(), [searchParams]);
    const queryString = queryStringFromUrl || initialQueryString;

    const paginationStateFromUrl = useMemo<PaginationState>(() => {
      const page = parsePositiveInteger(searchParams.get("page"), DEFAULT_PAGE);
      const limit = parsePositiveInteger(searchParams.get("limit"), DEFAULT_LIMIT);

      return {
        pageIndex: page - 1,
        pageSize: limit,
      };
    }, [searchParams]);

    const searchTermFromUrl = searchParams.get("searchTerm") ?? "";
    const genderFromUrl = searchParams.get("gender") ?? "";
    const specialtyTitlesFromUrl = useMemo(
      () => searchParams.getAll(SPECIALTIES_FILTER_KEY),
      [searchParams],
    );
    const appointmentFeeRangeFromUrl = useMemo<DataTableRangeValue>(() => {
      return {
        gte: searchParams.get("appointmentFee[gte]") ?? "",
        lte: searchParams.get("appointmentFee[lte]") ?? "",
      };
    }, [searchParams]);

    const sortingStateFromUrl = useMemo<SortingState>(() => {
      const sortBy = searchParams.get("sortBy");
      const sortOrder = searchParams.get("sortOrder");

      if (!sortBy || (sortOrder !== "asc" && sortOrder !== "desc")) {
        return [];
      }

      return [{ id: sortBy, desc: sortOrder === "desc" }];
    }, [searchParams]);

    const [optimisticSortingState, setOptimisticSortingState] = useState<SortingState>(sortingStateFromUrl);
    const [optimisticPaginationState, setOptimisticPaginationState] = useState<PaginationState>(paginationStateFromUrl);

    useEffect(() => {
      setOptimisticSortingState(sortingStateFromUrl);
    }, [sortingStateFromUrl]);

    useEffect(() => {
      setOptimisticPaginationState(paginationStateFromUrl);
    }, [paginationStateFromUrl]);

    const updateUrlAndRefresh = useCallback((params: URLSearchParams) => {
      const nextQuery = params.toString();
      const currentQuery = window.location.search.replace(/^\?/, "");

      if (nextQuery === currentQuery) {
        return;
      }

      const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

      // Update URL immediately for optimistic UX, then refresh server components.
      window.history.pushState(null, "", nextUrl);

      startSortingTransition(() => {
        router.refresh();
      });
    }, [pathname, router, startSortingTransition]);

    const handleSortingChange = useCallback((state: SortingState) => {
      setOptimisticSortingState(state);

      const params = new URLSearchParams(window.location.search);
      const nextSorting = state[0];

      if (nextSorting) {
        params.set("sortBy", nextSorting.id);
        params.set("sortOrder", nextSorting.desc ? "desc" : "asc");
      } else {
        params.delete("sortBy");
        params.delete("sortOrder");
      }

      // Reset to first page when sort order changes.
      params.set("page", "1");

      setOptimisticPaginationState((prevState) => ({
        pageIndex: 0,
        pageSize: prevState.pageSize,
      }));

      updateUrlAndRefresh(params);
    }, [updateUrlAndRefresh]);

    const handlePaginationChange = useCallback((state: PaginationState) => {
      setOptimisticPaginationState(state);

      const params = new URLSearchParams(window.location.search);
      params.set("page", String(state.pageIndex + 1));
      params.set("limit", String(state.pageSize));

      updateUrlAndRefresh(params);
    }, [updateUrlAndRefresh]);

    const handleDebouncedSearchChange = useCallback((searchTerm: string) => {
      const params = new URLSearchParams(window.location.search);
      const normalizedSearchTerm = searchTerm.trim();
      const currentSearchTerm = params.get("searchTerm") ?? "";

      if (normalizedSearchTerm === currentSearchTerm) {
        return;
      }

      if (normalizedSearchTerm) {
        params.set("searchTerm", normalizedSearchTerm);
      } else {
        params.delete("searchTerm");
      }

      // Start from first page when search query changes.
      params.set("page", "1");

      setOptimisticPaginationState((prevState) => ({
        pageIndex: 0,
        pageSize: prevState.pageSize,
      }));

      updateUrlAndRefresh(params);
    }, [updateUrlAndRefresh]);

    const { data : doctorDataResponse, isLoading, isFetching } = useQuery({
      queryKey: ["doctors", queryString],
      queryFn: () => getDoctors(queryString)
    });

    const { data: specialtiesResponse } = useQuery({
      queryKey: ["specialties"],
      queryFn: getAllSpecialties,
      staleTime: 1000 * 60 * 60 * 6,
      gcTime: 1000 * 60 * 60 * 24,
    });

    const doctors = doctorDataResponse?.data ?? [];
    const specialties = useMemo<ISpecialty[]>(() => {
      return specialtiesResponse?.data ?? [];
    }, [specialtiesResponse]);
    const meta: PaginationMeta | undefined = doctorDataResponse?.meta;

    const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
      return [
        {
          id: "gender",
          label: "Gender",
          type: "single-select",
          options: [
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
            { label: "Other", value: "OTHER" },
          ],
        },
        {
          id: SPECIALTIES_FILTER_KEY,
          label: "Specialties",
          type: "multi-select",
          options: specialties.map((specialty) => ({
            label: specialty.title,
            value: specialty.title,
          })),
        },
        {
          id: "appointmentFee",
          label: "Fee Range",
          type: "range",
        },
      ];
    }, [specialties]);

    const filterValues = useMemo<DataTableFilterValues>(() => {
      return {
        gender: genderFromUrl,
        [SPECIALTIES_FILTER_KEY]: specialtyTitlesFromUrl,
        appointmentFee: appointmentFeeRangeFromUrl,
      };
    }, [appointmentFeeRangeFromUrl, genderFromUrl, specialtyTitlesFromUrl]);

    const handleFilterChange = useCallback((filterId: string, value: DataTableFilterValue | undefined) => {
      const params = new URLSearchParams(window.location.search);

      if (filterId === "gender") {
        const nextGenderValue = typeof value === "string" ? value : "";
        if (nextGenderValue) {
          params.set("gender", nextGenderValue);
        } else {
          params.delete("gender");
        }
      }

      if (filterId === SPECIALTIES_FILTER_KEY) {
        params.delete(SPECIALTIES_FILTER_KEY);

        const nextSpecialties = Array.isArray(value) ? value : [];
        nextSpecialties.forEach((title) => {
          if (typeof title === "string" && title.length > 0) {
            params.append(SPECIALTIES_FILTER_KEY, title);
          }
        });
      }

      if (filterId === "appointmentFee") {
        params.delete("appointmentFee[gte]");
        params.delete("appointmentFee[lte]");

        const rangeValue =
          value && !Array.isArray(value) && typeof value === "object"
            ? (value as DataTableRangeValue)
            : {};

        (["gte", "lte"] as const).forEach((operator) => {
          const operatorValue = rangeValue[operator]?.trim();
          if (operatorValue) {
            params.set(`appointmentFee[${operator}]`, operatorValue);
          }
        });
      }

      // Reset to first page when any filter changes.
      params.set("page", "1");

      setOptimisticPaginationState((prevState) => ({
        pageIndex: 0,
        pageSize: prevState.pageSize,
      }));

      updateUrlAndRefresh(params);
    }, [updateUrlAndRefresh]);

    const clearAllFilters = useCallback(() => {
      const params = new URLSearchParams(window.location.search);
      params.delete("gender");
      params.delete(SPECIALTIES_FILTER_KEY);
      params.delete("appointmentFee[gte]");
      params.delete("appointmentFee[lte]");
      params.set("page", "1");

      setOptimisticPaginationState((prevState) => ({
        pageIndex: 0,
        pageSize: prevState.pageSize,
      }));

      updateUrlAndRefresh(params);
    }, [updateUrlAndRefresh]);

    const handleView = (doctor : IDoctor) => {
        console.log("View doctor", doctor);
    }

    const handleEdit = (doctor : IDoctor) => {
        console.log("Edit doctor", doctor);
    }

    const handleDelete = (doctor : IDoctor) => {
        console.log("Delete doctor", doctor);
    }


    // const { getHeaderGroups, getRowModel } = useReactTable({
    //    data: doctors,
    //    columns: doctorColumns,
    //    getCoreRowModel: getCoreRowModel(),
    // });   

    // console.log(doctorDataResponse?.data.map(doctor => doctor.name));

    console.log(doctors);
  // return (
  //   <Table>
  //     <TableHeader>
  //       {getHeaderGroups().map((hg) => (
  //         <TableRow key={hg.id}>
  //           {hg.headers.map((header) => (
  //             <TableHead key={header.id}>
  //               {flexRender(
  //                 header.column.columnDef.header,
  //                 header.getContext(),
  //               )}
  //             </TableHead>
  //           ))}
  //         </TableRow>
  //       ))}
  //     </TableHeader>
  //     <TableBody>
  //       {getRowModel().rows.map((row) => (
  //         <TableRow key={row.id}>
  //           {row.getVisibleCells().map((cell) => (
  //             <TableCell key={cell.id}>
  //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //             </TableCell>
  //           ))}
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // );

    return (
      <DataTable
        data={doctors}
        columns={doctorColumns}
        isLoading={isLoading || isFetching || isSortingTransitionPending}
        emptyMessage="No doctors found."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search doctor by name, email...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValues,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        meta={meta}
        actions={
          {
            onView : handleView,
            onEdit : handleEdit,
            onDelete : handleDelete
          }
        }
      />
    )

}




export default DoctorsTable