"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, User, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/services/doctor.services";
import { IDoctor } from "@/types/doctor.types";
import { Input } from "@/components/ui/input";

const DoctorsList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-full mb-12 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-[450px] bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-red-500 text-lg font-medium">Failed to load doctors. Please try again later.</p>
        <Button onClick={() => window.location.reload()} className="mt-4 rounded-full">
          Retry
        </Button>
      </div>
    );
  }

  const doctors: IDoctor[] = data?.data || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              Our <span className="text-primary">Specialists</span>
            </h1>
            <p className="text-muted-foreground">
              Showing {doctors.length} verified doctors available for consultation.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search by name, specialty..." 
                className="pl-10 rounded-full border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>
            <Button variant="outline" className="rounded-full gap-2">
              <Filter size={18} />
              Filter
            </Button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                {doctor.profilePhoto ? (
                  <Image
                    src={doctor.profilePhoto}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <User size={60} className="text-slate-300" />
                )}
                
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  {doctor.averageRating || "0.0"}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors truncate">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-primary font-semibold truncate uppercase tracking-wider">
                    {doctor.specialties?.[0]?.specialty?.title || doctor.designation}
                  </p>
                </div>

                <div className="space-y-2 mb-6 flex-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={16} className="shrink-0" />
                    <span className="text-xs truncate">{doctor.currentWorkingPlace || "Private Clinic"}</span>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-foreground font-medium">
                      {doctor.experience || 0} Years Exp
                    </span>
                    <span>•</span>
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-primary px-2 py-0.5 rounded-md font-medium">
                      ${doctor.appointmentFee}
                    </span>
                  </div>
                </div>

                <Button asChild className="w-full rounded-2xl group/btn mt-auto">
                  <Link href={`/consultation/doctor/${doctor.id}`}>
                    Book Appointment
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {doctors.length === 0 && (
          <div className="py-20 text-center">
            <User size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-lg text-muted-foreground">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
