'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Header } from '../../../../payload/payload-types'
import { noHeaderFooterUrls } from '../../../constants'
import { Gutter } from '../../Gutter'
import { HeaderNav } from '../Nav'

import classes from './index.module.scss'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState<boolean>(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={[
        scrolled ? classes.scrolled : classes.header,
        noHeaderFooterUrls.includes(pathname) && classes.hide,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Gutter className={classes.wrap}>
        <Link href="/">
          <Image
            src="/logo-black.svg"
            width={170}
            height={50}
            alt="logo"
            className={classes.logo}
          />
        </Link>

        <HeaderNav header={header} />
        {/* <HeaderMobileNav header={header} /> */}
      </Gutter>
    </nav>
  )
}

export default HeaderComponent
