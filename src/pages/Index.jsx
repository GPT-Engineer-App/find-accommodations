import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, Image, Grid, GridItem, Link, Spinner } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    const response = await fetch(`https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id=${searchQuery}&order_by=popularity&limit=10`, {
      headers: {
        "x-rapidapi-host": "booking-com.p.rapidapi.com",
        "x-rapidapi-key": "YOUR_RAPID_API_KEY",
      },
    });
    const data = await response.json();
    setSearchResults(data.result);
    setIsLoading(false);
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" mb={8}>
        Accommodation Search
      </Heading>
      <Box display="flex" mb={8}>
        <Input placeholder="Enter destination (e.g., New York)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} mr={4} />
        <Button leftIcon={<FaSearch />} onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          {searchResults.map((result) => (
            <GridItem key={result.hotel_id}>
              <Box borderWidth={1} borderRadius="lg" p={4}>
                <Image src={result.main_photo_url} alt={result.hotel_name} mb={4} />
                <Heading as="h2" size="lg" mb={2}>
                  {result.hotel_name}
                </Heading>
                <Text mb={2}>{result.address}</Text>
                <Link href={result.url} isExternal>
                  View on Booking.com
                </Link>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Index;
