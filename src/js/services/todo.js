export default class Todo
{
    constructor(title, deadline, cateogries, description, completed)
    {
        this.title = title;
        this.deadline = deadline;
        this.cateogries = cateogries;
        this.description = description;
        this.completed = completed;
    }

    /* Getters and Setters */

    getTitle() 
    {
        return this.title;
    }

    setTitle(title)
    {
        this.title = title;
    }

    getDeadline()
    {
        return this.deadline;
    }

    setDeadline(deadline)
    {
        this.deadline = deadline;
    }

    getCategories()
    {
        return this.cateogries;
    }

    setCategories(categories)
    {
        this.cateogries = categories;
    }

    getDescription()
    {
        return this.description;
    }

    setDescription(description)
    {
        this.description = description;
    }

    isCompleted()
    {
        return this.completed;
    }

    setCompleted(completed)
    {
        this.completed = completed;
    }
}