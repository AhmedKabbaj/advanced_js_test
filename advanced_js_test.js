
const developers = [
    { name: 'Alice', skillLevel: 7, maxHours: 40, preferredTaskType: 'feature' },
    { name: 'Bob', skillLevel: 9, maxHours: 30, preferredTaskType: 'bug' },
    { name: 'Charlie', skillLevel: 5, maxHours: 35, preferredTaskType: 'refactor' },
];

const tasks = [
    { taskName: 'Feature A', difficulty: 7, hoursRequired: 15, taskType: 'feature', priority: 4, dependencies: [] },
    { taskName: 'Bug Fix B', difficulty: 5, hoursRequired: 10, taskType: 'bug', priority: 5, dependencies: [] },
    { taskName: 'Refactor C', difficulty: 9, hoursRequired: 25, taskType: 'refactor', priority: 3, dependencies: ['Bug Fix B'] },
    { taskName: 'Optimization D', difficulty: 6, hoursRequired: 20, taskType: 'feature', priority: 2, dependencies: [] },
    { taskName: 'Upgrade E', difficulty: 8, hoursRequired: 15, taskType: 'feature', priority: 5, dependencies: ['Feature A'] },
];


function assignTasksWithPriorityAndDependencies(developers, tasks) {  
    const assignments = {};  
    const unassignedTasks = [];  

    developers.forEach((dev, index) => {  
        assignments[dev.name] = { tasks: [], totalHours: 0 };  
        developers[index]['availableHours'] = dev.maxHours
    });  

    const taskMap = new Map();  
    tasks.forEach(task => taskMap.set(task.taskName, task));  

    tasks.sort((a, b) => b.priority - a.priority);  

    tasks.forEach(task => {  
        const dependenciesCompleted = task.dependencies.every(dep => {  
            const depTask = taskMap.get(dep);  
            return depTask ? devHasCompletedTask(developers, dep) : true;  
        });

        if (!dependenciesCompleted) {  
            unassignedTasks.push(task.taskName);
            return;
        }

        const fitDevelopers = developers.filter(dev => {  
            return dev.skillLevel >= task.difficulty &&  
                   dev.availableHours >= task.hoursRequired &&  
                   dev.preferredTaskType === task.taskType;  
        });
        if (fitDevelopers.length === 0) {  
            unassignedTasks.push(task.taskName);
            return;
        }  

        if (fitDevelopers.length > 1) { 
	       // Sort developers by remaining hours
           fitDevelopers.sort((a, b) => b.availableHours - a.availableHours);  
	    }

        const assignedDev = fitDevelopers[0]; 
        assignments[assignedDev.name].tasks.push(task.taskName);  
        assignments[assignedDev.name].totalHours += task.hoursRequired;  
        assignedDev.availableHours -= task.hoursRequired;  
    });  

    return {
        assignments,
        unassignedTasks
    };
}


function devHasCompletedTask(developers, taskName) {  
 return developers.some(dev => dev.tasksCompleted && dev.tasksCompleted.includes(taskName));  
}  


const result = assignTasksWithPriorityAndDependencies(developers, tasks)
console.log(result)