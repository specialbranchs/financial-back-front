import { Toolbar } from '@mui/material';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
type Props = {};

const InstallationPage = (props: Props) => {
 
  return (
    <>
      <Toolbar variant='dense' sx={{
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].slice(0, 10).map(val => (
            <Card key={val} sx={{ m: 1 }} variant="solid" color="neutral" invertedColors>
              <CardContent orientation="horizontal">
                <CardContent>
                  <CardContent>
                    <Typography level="h2">{val}</Typography>
                    <Typography level="body-md">Gross profit</Typography>

                  </CardContent>
                </CardContent>
              </CardContent>

            </Card>
          ))
        }
      </Toolbar>
    </>
  );
};

export default InstallationPage;