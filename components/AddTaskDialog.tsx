'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Task } from "@/types"
import { Calendar } from "lucide-react"

interface AddTaskDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (task: Partial<Task>) => Promise<void>
    defaultValues?: Task
}

export function AddTaskDialog({ open, onOpenChange, onSubmit }: AddTaskDialogProps) {
    const [formData, setFormData] = useState<Partial<Task>>({
        title: '',
        priority: 1 as 1 | 2 | 3 | 4 | 5,
        status: 'pending',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ ...formData })
        setFormData({
            title: '',
            priority: 1 as 1 | 2 | 3 | 4 | 5,
            status: 'pending',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: ''
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Add New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <Input 
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <Select 
                                value={String(formData.priority)}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: parseInt(value) as 1 | 2 | 3 | 4 | 5 }))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1,2,3,4,5].map(p => (
                                        <SelectItem key={p} value={String(p)}> {p}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2 mt-5">
                            <span>Pending</span>
                            <Switch 
                                checked={formData.status === 'finished'}
                                onCheckedChange={(checked) => 
                                    setFormData(prev => ({ ...prev, status: checked ? 'finished' : 'pending' }))
                                }
                            />
                            <span>Finished</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <div className="relative">
                                <Input 
                                    type="datetime-local"
                                    value={`${formData.startDate}T${formData.startTime}`}
                                    onChange={(e) => {
                                        const [date, time] = e.target.value.split('T')
                                        setFormData(prev => ({ ...prev, startDate: date, startTime: time }))
                                    }}
                                    className="pl-10 w-full"
                                />
                                <Calendar className="absolute left-2 top-2 cursor-pointer" onClick={() => (document.querySelector('#startDateTime') as HTMLElement)?.click()} />
                            </div>
                        </div>
                        <div className="space-y-2 relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <div className="relative">
                                <Input 
                                    type="datetime-local"
                                    value={`${formData.endDate}T${formData.endTime}`}
                                    onChange={(e) => {
                                        const [date, time] = e.target.value.split('T')
                                        setFormData(prev => ({ ...prev, endDate: date, endTime: time }))
                                    }}
                                    className="pl-10 w-full"
                                />
                                <Calendar className="absolute left-2 top-2 cursor-pointer" onClick={() => (document.querySelector('#endDateTime') as HTMLElement)?.click()} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start gap-2">
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Add Task</Button>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
