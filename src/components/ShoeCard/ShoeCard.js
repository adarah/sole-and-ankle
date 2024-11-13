import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={variant === 'on-sale'}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
      <Label variant={variant} />
    </Link>
  );
};

function Label({ variant }) {
  if (!variant || variant === "default") {
    return null;
  }

  return (
    <LabelText
      style={{
        "--color":
          variant === "new-release" ? COLORS.secondary : COLORS.primary,
      }}
    >
      {formatLabel(variant)}
    </LabelText>
  );
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  position: relative;
`;

const Wrapper = styled.article`
  border-radius: 16px 16px 4px 4px;
  overflow: clip;
`;

const ImageWrapper = styled.div`
  position: relative;
  line-height: 0;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${props => props.onSale && 'line-through'};
  color: ${props => props.onSale && COLORS.gray[700]};
  text-decoration-color: ${props => props.onSale && COLORS.gray[700]};
  font-weight: 500;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const LabelText = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 0.5rem;
  background-color: var(--color);

  font-weight: 700;
  line-height: 1rem;
  color: ${COLORS.white};
  border-radius: 2px;
  font-size: ${14 / 16}rem;
`;

function formatLabel(variant) {
  switch (variant) {
    case "new-release":
      return "Just Released!";
    case "on-sale":
      return "Sale";
    default:
      return "";
  }
}

export default ShoeCard;
