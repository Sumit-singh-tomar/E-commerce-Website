import MaterialTable from "@material-table/core"
import categoryimg from '../assets/category.png'
import { useEffect } from "react"
import { getData } from "../services/FetchNodeServices"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function DisplayAllBanner(){
    const navigate=useNavigate()
    const [banner,setBanner]=useState([])

    const fetchAllBanner=async ()=>{
        var response=await getData('banner/fetch_all_banner')
        setBanner(response.data)
    }

    useEffect(function(){
        fetchAllBanner()
    },[])
    
    function showAllBanner(){
        return(<div>
            <MaterialTable
            title={
                <div style={{ display: 'flex' }}>
                    <div>
                        <img src={categoryimg} alt="category" width="25"></img>
                    </div>
                    <div style={{ marginLeft: 5, fontFamily: 'consolas', fontSize: 22 }}>
                        Brand List
                    </div>
                </div>
            }

            columns={[
                { title: 'BannerID', field:'bannerid' },
                { title: 'files', field:'files'},
            ]}
            data={banner}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit Brand',
                    onClick: (event, rowData) => console.log('flkd')
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete Brand',
                    onClick: (event, rowData) => console.log('edit')
                },
                {
                    icon: 'add',
                    tooltip: 'Add Banner',
                    isFreeAction: true,
                    onClick: (event) => navigate("/banner")
                }
            ]}
        />

        </div>)
    }

    return(
    <div>
        {showAllBanner()}
    </div>)
}

export default DisplayAllBanner