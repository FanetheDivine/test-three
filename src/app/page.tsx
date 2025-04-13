import { FC } from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import classnames from '@/utils/classnames'

const projects = ['test1']

const Page: FC = () => {
  return projects.map((name) => (
    <Link href={name} key={name}>
      <Button type='primary' className={classnames('bg-black')}>
        {name}
      </Button>
    </Link>
  ))
}

export default Page
