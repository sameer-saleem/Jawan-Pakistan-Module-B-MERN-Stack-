import { Box, Grid } from '@mui/material'
import CategoryList from './components/category-list/CategoryList'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Banner from './components/banner/MainBanner'
import PopularCards from './components/popular-cards/PopularCards'

const App = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <Grid container spacing={3} sx={{padding: '1.5rem'}}>
          <Grid size={{ xs: 6, md: 3 }}>
            <CategoryList />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Banner />
              </Grid>
              <Grid size={12}>
                <PopularCards />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}

export default App