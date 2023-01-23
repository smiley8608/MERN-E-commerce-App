import { useEffect, useState } from "react"
import Web3 from "web3"


const MetamaskTransaction=()=>{
    const {ethereum}:any=window
    const GoerliTestnet = 5;
    const web3= new  Web3(ethereum)
    const [chainId,setchainId]=useState()
    const [currentAccount,setCurrentAccount]=useState()
    // web3.setProvider("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")
    const connectwallet= async(chainId:any)=>{
        try {
            if(!ethereum){
                return console.log('please install metamask');
                
            }else{
               const accounts=await ethereum.request({method:'eth_requestAccounts'})
               
               await switchNetwork(chainId)
                
            }
        } catch (error) {
            console.log(error);
            
        }         
    }
    
    const switchNetwork=async(chainId:any)=>{
        try {
            if(!ethereum){
                console.log('please install metamask');
                
            }else{
                const currentChainId=await web3.eth.getChainId()
                console.log(currentChainId,chainId);
                
                if(currentChainId !== chainId){
                    await web3.givenProvider.request({
                        method:'wallet_switchEthereumChain',
                        params:[{
    
                            chainId:web3.utils.toHex(chainId)
                        }
                        ]
                    })
                    setchainId(chainId)
                    const accounts = await web3.givenProvider.request({
                      method: "eth_requestAccounts",
                    });
                    //  alert(accounts);
            
                    setCurrentAccount(accounts[0]);
                }
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
       
    })

    return(
        <div>
           <button onClick={()=>connectwallet(GoerliTestnet)}>ConnectTOWallet</button>

        </div>
    )

}

export default MetamaskTransaction