import MainMovie from "@/components/home-page/MainMovie"
import CategoryList from "@/components/home-page/CategoryList"

const Home = () => {
  
  return (
    <section>
      <MainMovie/>
      <article className="flex flex-col gap-5 pb-10">
        <CategoryList categoryName="Horror" />
        <CategoryList categoryName="Comedy" />
        <CategoryList categoryName="Family" />
        <CategoryList categoryName="Action" />
      </article>
    </section>
  )
}

export default Home