import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import WcIcon from "@mui/icons-material/Wc";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Category} from "../types";
import * as MuiIcons from '@mui/icons-material';
import Link from "next/link";

type CategoryCardProps = {
  category: Category
}

function CategoryCard({category}: CategoryCardProps) {
  // @ts-ignore
  const CategoryIcon = !category.icon ? WcIcon : MuiIcons[category.icon];

  return (
    <Link href={'/category/[id]'} as={`/category/${category.id}`}>
      <Card
        sx={{
          padding: '1rem',
          borderRadius: "1rem",
          textAlign: 'center',
          transition: "transform 0.5s ease-in-out",
          "&:hover": {
            transform: "scale3d(1.075, 1.075, 1)",
            boxShadow: "0px 3px 1px -2px white,0px 2px 2px 0px #bb85fb,0px 1px 5px 0px #c595fd"
          },
        }}>
        <CardContent>
          <CategoryIcon sx={{
            color: 'primary.light',
            fontSize: '3rem'
          }}/>
          <Typography variant="h4" component="div">
            {category.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CategoryCard;
