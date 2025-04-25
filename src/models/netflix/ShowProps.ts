export interface ShowProps {
  title: string;
  description: string;
  thumbnailUrl: string;
}

export interface FeaturedShowProps extends ShowProps{
  id: number;
  isInWatchlist: boolean; 
  manageWatchlist: (id: number) => void; // function that accepts id of number type and returns nothing
}
