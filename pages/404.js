import { Box, Image } from '@skynexui/components';

export default function PagErro(){
    return(
        <>
            <Box
                styleSheet={{
                    display : "flex",
                    flexDirection : "column",
                    alignItems : "center",
                    justifyContent : "center",
                    backgroundImage : "linear-gradient(180deg, #ffffff 0%, #d7e1ec 74%)",
                    backgroundColor : "#ffffff",
                }}
            >
                <Image
                    styleSheet={{
                        width: "400px",
                        borderRadius : "10px"
                    }}
                    src="https://media3.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif?cid=790b76112f5692e61237951bf23aee54021cba51151e44ea&rid=giphy.gif&ct=g" 
                />
            </Box>
        </>

)}