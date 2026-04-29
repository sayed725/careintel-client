"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/services/doctor.services";
import { IDoctor } from "@/types/doctor.types";

const TopDoctor = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["top-doctors"],
    queryFn: () => getDoctors("limit=3"),
  });

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-full mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[500px] bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center text-red-500">
          Failed to load top doctors.
        </div>
      </section>
    );
  }

  const doctors: IDoctor[] = data?.data || [];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Meet Our <span className="text-primary">Top Specialists</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Our doctors are highly qualified and experienced in their respective fields, dedicated to providing the best care.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full group">
            <Link href="/consultation">
              See All Doctors
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                {doctor.profilePhoto ? (
                  <Image
                    src={doctor.profilePhoto}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <User size={80} className="text-slate-300" />
                )}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-sm">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  {doctor.averageRating || "0.0"}
                </div>
              </div>
              
              <div className="p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors truncate">
                    {doctor.name}
                  </h3>
                  <p className="text-primary font-medium truncate">
                    {doctor.specialties?.[0]?.specialty?.title || doctor.designation}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin size={18} />
                  <span className="text-sm truncate">{doctor.currentWorkingPlace || doctor.address}</span>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">${doctor.appointmentFee}</span> Fee
                  </div>
                  <Button asChild size="sm" className="rounded-full px-5">
                    <Link href={`/consultation/doctor/${doctor.id}`}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDoctor;
