import React from 'react';
import styled from 'styled-components/macro';

import { WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';
import {keyframes} from "styled-components";

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
          {variant === 'on-sale' && <SaleFlag>Sale</SaleFlag>}
          {variant === 'new-release' && (
            <NewFlag>Just released!</NewFlag>
          )}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--color':
                variant === 'on-sale'
                  ? 'var(--color-gray-700)'
                  : undefined,
              '--text-decoration':
                variant === 'on-sale' ? 'line-through' : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const shake = keyframes`
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0);
  }
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
  
`;

const Image = styled.img`
  width: 100%;
  transition: transform 300ms;
  border-radius: 16px 16px 4px 4px;
  transform-origin: 50% 65%;
  
  &:hover{
    transform: scale(1.1);
    transition: transform 100ms;
  }
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 2px;
  
  &:hover {
    animation: ${shake} 200ms ease-in-out;
  }
`;

const SaleFlag = styled(Flag)`
  background-color: var(--color-primary);
`;
const NewFlag = styled(Flag)`
  background-color: var(--color-secondary);
`;

export default ShoeCard;
