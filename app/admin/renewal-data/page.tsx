import { RenewalOptionTable } from "@/components/admin/data-table";
import { renwalData } from "@/lib/fetch-data";

export const dynamic = "force-dynamic"

const RenwalData = async() => {

    const data = await renwalData();

    if (!data) {
        return <p>Failed to load</p>
    }
    return ( 
        <div>
           <RenewalOptionTable data={data}/>
        </div>
     );
}
 
export default RenwalData;