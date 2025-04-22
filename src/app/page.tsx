import { FC } from 'react'
import Link from 'next/link'

const projects = ['1.three-playground']

const Page: FC = () => {
  return (
    <div className='mx-auto w-max flex flex-col p-4'>
      {projects.map((name) => (
        <Link className='text-xl' href={name} key={name}>
          {name}
        </Link>
      ))}
    </div>
  )
}

export default Page
