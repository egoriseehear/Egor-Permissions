import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { DataContext } from './Context';

function PermissionAPI({url}) {
  const { updateData } = useContext(DataContext);

  useEffect(() => {
    fetchData(url);
  }, [url]);
  
      const fetchData = async (url) => {
        try {
          const response = await axios.get(url);
          updateData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

  
    return (
        <div>

      </div>
    );
}

export default PermissionAPI