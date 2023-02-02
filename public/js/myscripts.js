
function Login(){
    const Phone=document.getElementById("phone").value;
    
    fetch('/work/login',{
        method:'POST',
        body:new URLSearchParams({
            phone:Phone
        })
        }).then((res)=>{
            return res.json()}).then((data)=>{
                let resualt="phone not match";
                if(data.msg==1){
                    resualt="good!";
                }
             alert(resualt);
             window.location("/2");
                })

            
}