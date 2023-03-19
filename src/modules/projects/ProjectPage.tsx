import { Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";

interface Props {
    projects: Prisma.ProjectsSelect[];
    refreshData: () => void;
}

const ProjectPage = ({ projects, refreshData }: Props) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const body = { name: data.name, }
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const result = await response.json();
            console.log(result);
            refreshData();
            reset();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Project name" {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
                <button type="submit">Add</button>
            </form>
            {
                projects && projects.map((project, index) => (
                    <div key={index}>
                        <h1>{project.name}</h1>
                        <p>{project.createdAt}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default ProjectPage;