export const input = {
    height: '40px',
    width: '230px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
};

export const icon = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px', 
  
};

export const name = {
    fontSize: '18px',
    textTransform: 'capitalize',
    padding: '12px 15px',
};

export const deleteicon = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: '#f44336', 
    color: 'white',
    width: '36px',
    height: '36px',
    fontSize: '24px',
    cursor: 'pointer',
};

export const editicon = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    width: '36px',
    height: '36px',
    fontSize: '24px',
    cursor: 'pointer',
    marginRight: '8px',
    
};

export const tableHead = {
    width: '100%',
    backgroundColor: '#1976d2', // Blue color for table header background
    color: 'white',
    '& .MuiTableCell-root': {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px', // Adjusted font size for table header cells
        padding: '15px',
    },
};

export const tableBody = {
    '& .MuiTableCell-root': {
        backgroundColor: '#f5f5f5', // Light gray background for table body cells
        fontSize: '16px',
        padding: '12px',
    },
    '& .MuiTableRow-root:nth-of-type(odd)': {
        backgroundColor: '#e0e0e0', // Alternate row color for better readability
    },
};

export const container = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#ffffff', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ccc', 
};

export const addbtn = {
    width: '15%',
    height: '40px',
    backgroundColor: 'green',
    marginBottom:"17px ",
    color: 'white',
    textTransform: 'capitalize', 
    whiteSpace: 'nowrap',
    border: 'none', 
    borderRadius: '5px',
    cursor: 'pointer', 
    fontSize: '16px', 
    fontWeight: 'bold', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
    transition: 'background-color 0.3s, transform 0.2s', 
    '&:hover': {
        backgroundColor: '#4CAF50', // Darker green on hover
        transform: 'scale(1.05)', // Slightly larger on hover
    },
};
