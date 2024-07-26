import React from 'react'

export default function ProfilePage({params}: any) {
  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-white text-black px-4 py-12 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
      <div>
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-foreground">
          USER ID
        </h1>
      </div>
      <div className="flex justify-center">
        <p>User Id: {params.id}</p>
      </div>
    </div>
  </div>
  )
}
