const Rainbow = (WrappedComponent) => {
    return () => (
        <div className="container center-align" 
        style={{background: 'linear-gradient(#2A2A72, #009FFD)' ,color:'white',
        border: '5px solid #333', borderRadius: '20px',
        maxWidth: '700px', padding: '10px', margin: '20px auto'}}>
        <WrappedComponent />
        </div>)
}

export default Rainbow;

