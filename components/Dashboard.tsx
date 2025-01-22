'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "./Header"

export function Dashboard() {
    return (
        <>
        <Header/>
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Tasks" value="25" />
                <StatCard title="Tasks Completed" value="40%" />
                <StatCard title="Tasks Pending" value="60%" />
                <StatCard title="Avg Time per Task" value="0.5h" />
            </div>
              <div className="bg-white rounded-lg p-6 shadow-xl">
                  <h2 className="text-3xl font-semibold mb-6 text-gray-800">Pending Task Summary</h2>
                
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <StatCard title="Pending Tasks" value="15" />
                      <StatCard title="Total Time Elapsed" value="56h" />
                      <StatCard title="Time to Finish" value="24h" />
                  </div>

                  <table className="w-full text-left">
                      <thead>
                          <tr className="border-b bg-gray-800 text-white">
                              <th className="py-4 px-6 font-semibold">Priority</th>
                              <th className="py-4 px-6 font-semibold">Pending Tasks</th>
                              <th className="py-4 px-6 font-semibold">Time Elapsed (hrs)</th>
                              <th className="py-4 px-6 font-semibold">Time to Finish (hrs)</th>
                          </tr>
                      </thead>
                      <tbody>
                          {[1, 2, 3, 4, 5].map(priority => (
                              <tr key={priority} className="border-b hover:bg-gray-100">
                                  <td className="py-4 px-6 text-gray-800">{priority}</td>
                                  <td className="py-4 px-6 text-gray-800">5</td>
                                  <td className="py-4 px-6 text-gray-800">2.5</td>
                                  <td className="py-4 px-6 text-gray-800">1.5</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
        </>
    )
}

function StatCard({ title, value }: { title: string, value: string }) {
    return (
        <Card className="flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-lg transition-shadow">
            <CardContent className="text-center">
                <div className="text-4xl font-extrabold mb-3 text-[#6A67CE]">{value}</div>
                <div className="text-gray-700 font-medium">{title}</div>
            </CardContent>
        </Card>
    )
}
