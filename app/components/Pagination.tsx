function Pagination({ page, setPage }: any) {
    return (
        <div className="flex items-center justify-center py-4 md:py-8 flex-wrap text-base-content">
            <div className="btn-group ">
                <button className="btn btn-primary btn-outline" onClick={() => setPage(page - 1)} disabled={page === 1}>«</button>
                <button className="btn btn-primary btn-outline">Page {page}</button>
                <button className="btn btn-primary btn-outline" onClick={() => setPage(page + 1)}>»</button>
            </div>
        </div>

    )
}

export default Pagination