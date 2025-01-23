import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useState, useEffect } from "react"
import { Calendar } from "lucide-react" 

export function EditTaskDialog({ open, onOpenChange, task }: { open: boolean; onOpenChange: (isOpen: boolean) => void; task: Partial<Task>; }) {
    const [title, setTitle] = useState(task?.title || "");
    const [priority, setPriority] = useState(task?.priority || 1);
    const [status, setStatus] = useState(task?.status === "finished");
    const [startDate, setStartDate] = useState(task?.startDate || "");
    const [startTime, setStartTime] = useState(task?.startTime || "");
    const [endDate, setEndDate] = useState(task?.endDate || "");
    const [endTime, setEndTime] = useState(task?.endTime || "");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setPriority(task.priority);
            setStatus(task.status === "finished");
            setStartDate(task.startDate);
            setStartTime(task.startTime);
            setEndDate(task.endDate);
            setEndTime(task.endTime);
        }
    }, [task]);

    const handleUpdate = () => {
        const updatedTask = {
            ...task,
            title,
            priority,
            status: status ? "finished" : "pending",
            startDate,
            startTime,
            endDate,
            endTime
        };
        console.log(updatedTask);
        setOpen(false);
    };

    const setOpen = (isOpen: boolean) => {
        onOpenChange(isOpen);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="text-gray-600">Task ID: {task?.id}</div>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full" />
                    <div className="flex justify-between items-center">
                        <div className="w-1/2">
                            <Select value={String(priority)} onValueChange={(value) => setPriority(Number(value))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5].map(p => (
                                        <SelectItem key={p} value={String(p)}>{p}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Pending</span>
                            <Switch checked={status} onCheckedChange={setStatus} />
                            <span>Finished</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <div className="text-gray-600 text-sm">Start</div>
                            <Calendar className="absolute left-2 top-8 w-5 h-5 text-gray-400" />
                            <Input type="datetime-local" value={`${startDate}T${startTime}`} onChange={(e) => {
                                const [date, time] = e.target.value.split('T');
                                setStartDate(date);
                                setStartTime(time);
                            }} placeholder="Start Date and Time" className="w-full pl-10" />
                        </div>
                        <div className="relative">
                            <div className="text-gray-600 text-sm">End</div>
                            <Calendar className="absolute left-2 top-8 w-5 h-5 text-gray-400" />
                            <Input type="datetime-local" value={`${endDate}T${endTime}`} onChange={(e) => {
                                const [date, time] = e.target.value.split('T');
                                setEndDate(date);
                                setEndTime(time);
                            }} placeholder="End Date and Time" className="w-full pl-10" />
                        </div>
                    </div>
                    <div className="flex justify-start gap-2 mt-4">
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleUpdate}>
                            Update
                        </Button>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
