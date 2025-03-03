import MainMovie from "@/components/home-page/MainMovie"
import CategoryList from "@/components/home-page/CategoryList"

const Home = () => {
  return (
    <section>
      <MainMovie
          backgroundImage="https://image.tmdb.org/t/p/original/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg"
          title="The Gorge"
          description="Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge... Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge..."
          rating={7.8}
        />
      <CategoryList />
    </section>
  )
}

export default Home