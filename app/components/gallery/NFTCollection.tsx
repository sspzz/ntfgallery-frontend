import styled from "styled-components";
import NFTItem from "./NFTItem";
import { NFT } from "@/app/hooks/useOwnedNFTs";

const NFTCollection = ({
  itemWidth,
  nfts,
  title,
}: {
  itemWidth: number;
  nfts: NFT[];
  title?: string;
}) => {
  if (nfts.length === 0) {
    return null;
  }

  return (
    <Container>
      {title && <Title>{title}</Title>}
      {nfts.length > 0 && (
        <Grid itemWidth={itemWidth}>
          {nfts?.map((t) => {
            return Array.from(Array(t.balance)).map(() => (
              <NFTItem
                nft={t}
                key={`${t.contract.address}-${t.tokenId}`}
                width={itemWidth}
              />
            ));
          })}
        </Grid>
      )}
    </Container>
  );
};

export default NFTCollection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  padding: 1em;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5em;
`;

interface GridProps {
  itemWidth: number;
}

const Grid = styled.div<GridProps>`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  flex-wrap: wrap;
  column-gap: ${(props) => props.itemWidth * 0.05}px;
  row-gap: ${(props) => props.itemWidth * 0.05}px;
`;
