import React from 'react'
import Card from './Card'
import Pagination from "../components/Pagination";


function Grid({ mangaListArray, page, setPage }: any) {
    const gridItems = mangaListArray 
      ? mangaListArray.map((child: any, index: number) => {
          return (
              <Card key={index} child={child} />
          )
      })
      : [];

    return (
        <>
            <Pagination page={page} setPage={setPage} className=" hover" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:grid-cols-6">
                {gridItems}
            </div>
            <Pagination page={page} setPage={setPage} className=" hover" />
        </>
    )
}


export default Grid