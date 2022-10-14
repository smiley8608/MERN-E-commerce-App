import { Input } from "antd";
import { setModifier } from "../redux/headerSlice";
import { useAppDispatch } from "../redux/hook";

export const Search=()=>{

    const dispatch =useAppDispatch()
   const  searchHandler=(value:string)=>{
    console.log(value);
    dispatch(setModifier({search:value}))
    
    // axios.get('http://localhost:4000//searchProduct?search='+value)
    // .then(result=>{
    //     console.log(result.data.Result);
        
    // }).catch(err=>{
    //     console.log(err);
        
    // })
   }
    return(
        <div>
            <Input.Search  placeholder="Search here...." size={"large"} onSearch={searchHandler} enterButton />
        </div>
    )

}