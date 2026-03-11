"use client"

import AppointmentBarChart from "@/components/shared/AppointmentBarChart"
import AppointmentPieChart from "@/components/shared/AppointmentPieChart"
import StatsCard from "@/components/shared/StatsCard"
import { getDashboardData } from "@/services/dashboard.services"
import { ApiResponse } from "@/types/api.types"
import { IAdminDashboardData } from "@/types/dashboard.types"
import { useQuery } from "@tanstack/react-query"

const AdminDashboardContent = () => {
    const {data : adminDashboardData} = useQuery({
        queryKey: ["admin-dashboard-data"],
        queryFn: getDashboardData,
        refetchOnWindowFocus: "always" // Refetch the data when the window regains focus
    })

    const {data} = adminDashboardData as ApiResponse<IAdminDashboardData>;

    // console.log(data);
  return (
   <div className="space-y-8">
           

            {/* Stats Grid: Responsive 1, 2, or 4 columns */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Appointments"
                    value={data?.appointmentCount || 0}
                    iconName="CalendarDays"
                    description="Total scheduled"
                />
                <StatsCard
                    title="Total Patients"
                    value={data?.patientCount || 0}
                    iconName="Users"
                    description="Registered patients"
                />
                <StatsCard
                    title="Total Revenue"
                    value={`$${data?.totalRevenue?.toLocaleString() || 0}`}
                    iconName="DollarSign"
                    description="Gross earnings"
                />
                <StatsCard
                    title="Doctors"
                    value={data?.doctorCount || 0}
                    iconName="Stethoscope"
                    description="Active medical staff"
                />
            </div>

            {/* Charts Section: Stacks on mobile, Side-by-side on desktop */}
            <div className="grid gap-6 lg:grid-cols-7">
                <div className="lg:col-span-4">
                   
                    <AppointmentBarChart data={data?.barChartData || []} title="Appointment Trends" description="Monthly Appointment Statistics" />
                </div>
                
                <div className="lg:col-span-3 ">
                    
                    <AppointmentPieChart data={data?.pieChartData || []} title="Total Appointments Chart" description="Total Appointment Statistics" />
                </div>
            </div>
        </div>
  )
}

export default AdminDashboardContent