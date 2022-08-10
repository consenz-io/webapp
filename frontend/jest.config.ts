export default {
  clearMocks: true,
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  testRegex: '.test.(ts|tsx?)$',
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/src/svgTransform.js',
  },
};
