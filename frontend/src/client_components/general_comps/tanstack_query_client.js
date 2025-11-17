// src/client_components/general_comps/tanstack_query_client.js
"use client"

import React, { useState } from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'



const TanstackQueryClient = ({children}) => {
    let [queryClient]=useState(()=>{return new QueryClient()})
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default TanstackQueryClient;