import UsersDataTable from "./_components/users-datatable";


async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  console.log(response)
  return response.json();
}
export default async function Users() {
  const users = await fetchUsers();
  console.log(users)
  return (
    <>
    <div className="p-10 pt-20">
    <UsersDataTable users={users} />
    </div>
      
    </>

  )
}
