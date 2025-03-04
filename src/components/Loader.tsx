import { Audio } from 'react-loader-spinner';
const Loader = () => {
    return (
        <div>
            <div className='load d-flex' style={{height:"100vh",width:"100vw", position:"fixed",top:"0",left:"0", justifyContent:"center",alignItems:"center"}}>
                <Audio
                    height="100"
                    width="100"
                    color="#2a3758"
                    ariaLabel="audio-loading"
                    visible={true}
                /></div>

        </div>
    );
};

export default Loader;
