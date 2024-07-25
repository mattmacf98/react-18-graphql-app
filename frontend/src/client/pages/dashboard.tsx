import DashboardLayout from "../components/dashboard/DashboardLayout";
import UserProvider from "../contexts/user";

const Page = () => (
    <UserProvider page="dashboard">
        <DashboardLayout/>
    </UserProvider>
)

export default Page;