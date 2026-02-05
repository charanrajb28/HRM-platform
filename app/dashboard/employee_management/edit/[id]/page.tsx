export default function EditEmployee({
    params,
}: {
    params: { id:string};
}){
    return(
        <div>
            <h1 className=" text-red-600">Edit employee:{params.id}</h1>
        </div>
    );
}