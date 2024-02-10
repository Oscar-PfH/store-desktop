import React, { useState, useEffect } from "react";

function PackagesList() {
    const [packages, setPackages] = useState({});

    const getPackages = async () => {
        console.log('getting packages');
        //setPackages({});
    }

    useEffect(() => {
        getPackages();
    });

    return(<>
        <h1>Lista de paquetes</h1>
    </>)
}

export default PackagesList;