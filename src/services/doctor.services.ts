"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IDoctor } from "@/types/doctor.types";
import { ISpecialty } from "@/types/specialty.types";



export const getDoctors = async (queryString : string) => {
    try {
        const doctors = await httpClient.get<IDoctor[]>(queryString ? `/doctors?${queryString}` : "/doctors");
        return doctors;
    } catch (error) {
        console.log("Error fetching doctors:", error);
        throw error;
    }
}

export const getAllSpecialties = async () => {
    try {
        const specialties = await httpClient.get<ISpecialty[]>("/specialties");
        return specialties;
    } catch (error) {
        console.log("Error fetching specialties:", error);
        throw error;
    }
}