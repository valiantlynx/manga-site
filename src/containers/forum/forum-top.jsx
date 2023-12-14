const ForumTop = () => (
    <div className="forum-top rn-section-gap bg-color--1">
        <div className="container">
            <div className="row g-5 align-items-center d-flex">
                <div className="col-lg-6 offset-lg-3">
                    <div className="forum-search">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Hear..."
                                aria-label="Recipient's username"
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary-alta btn-outline-secondary"
                                    type="button"
                                >
                                    Search Hear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ForumTop;
