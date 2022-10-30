import ReactPaginate from 'react-paginate';
import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';

const Pagination = ({itemsPerPage, items}) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
      }, [itemOffset, itemsPerPage]);

      const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };

    return (
        <>
         {currentItems === null || currentItems.length === 0 ? null : currentItems.map(rest => {
            return (
            <Card style={{ 'margin-bottom': '20px' }}>
                <Card.Header as="h5">{rest.rest_name}</Card.Header>
                <Card.Body>
                    <Card.Text>{rest.rest_location}</Card.Text>
                    <Card.Text>size: {rest.rest_size}</Card.Text>
                </Card.Body>
            </Card>
            )
        })}
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
        />
        </>
    )
}

export default Pagination