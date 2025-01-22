'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddTaskDialog } from "./AddTaskDialog"
import { useState } from "react"
import { Plus } from "lucide-react"
import { Header } from "./Header"
import { EditTaskDialog } from "./EditTaskDialog"

type Task = {
    id: string;
    title: string;
    priority: number;
    status: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
}

const initialTasks = [
    {
        id: '1',
        title: 'Sample Task',
        priority: 1,
        status: 'pending',
        startDate: '2024-02-20',
        startTime: '10:00',
        endDate: '2024-02-20',
        endTime: '11:00'
    }
]

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit'
    }).replace(/ /g, '-');
}

const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
}

const TaskDateTime = ({ label, date, time }: { label: string, date: string, time: string }) => (
    <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-sm">{formatDate(date)}</div>
        <div className="text-sm">{formatTime(time)}</div>
    </div>
);

export function TaskCard({ task, onDelete }: { task: Task, onDelete: (id: string) => void }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <Card className="h-[320px] w-[280px] border border-gray-300 rounded-lg shadow-md">
            <CardContent className="pt-6 flex flex-col justify-between h-full p-4">
                <div>
                    <div className="text-sm text-gray-500 mb-2">Task ID: {task.id}</div>
                    <h3 className="text-base font-bold mb-4 text-purple-600">{task.title}</h3>
                    <div className="flex justify-between mb-4">
                        <span className={`text-sm px-2 py-1 rounded-full ${task.status === 'pending' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">Priority: {task.priority}</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <TaskDateTime label="Start" date={task.startDate} time={task.startTime} />
                            <TaskDateTime label="End" date={task.endDate} time={task.endTime} />
                        </div>
                        
                    </div>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-center gap-4 mt-1">
                    <Button className="text-purple-600" variant="link" size="sm" onClick={() => setIsEditOpen(true)}>Edit</Button>
                    <EditTaskDialog open={isEditOpen} onOpenChange={setIsEditOpen} task={task} />
                    <Button className="text-red-600" variant="link" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export function TaskList() {
    const [tasks, setTasks] = useState(initialTasks)
    const [isAddOpen, setIsAddOpen] = useState(false)

    const handleAdd = async (newTask: any): Promise<void> => {
        setTasks([...tasks, { ...newTask, id: String(tasks.length + 1) }])
        setIsAddOpen(false)
    }

    const handleDelete = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <>
            <Header />
            <div className="flex min-h-screen flex-col">
                <div className="container mx-auto p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-4 text-black">Task List</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <Button 
                                className="bg-white hover:bg-gray-200 text-gray-600 border border-gray-400"
                                onClick={() => setIsAddOpen(true)}
                            >
                                <Plus className="h-4 w-4 mr-2" /> Add Task
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {tasks.map(task => (
                            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
                        ))}
                    </div>

                    <AddTaskDialog 
                        open={isAddOpen}
                        onOpenChange={setIsAddOpen}
                        onSubmit={handleAdd}
                    />
                </div>
            </div>
        </>
    )
}
