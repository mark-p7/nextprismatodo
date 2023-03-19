import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from 'next'
import { Prisma } from '@prisma/client'
import { useRouter } from 'next/router'
import prisma from '@/lib/prismadb'
import { ProjectPage } from '@/modules/projects'
interface Props {
  projects: Prisma.ProjectsSelect[];
}

export default function Home({ projects } : Props) {

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  }

  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Todo application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <ProjectPage projects={projects} refreshData={refreshData} />
      </>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const projects = await prisma.projects.findMany({});

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects))
    },
  }
}