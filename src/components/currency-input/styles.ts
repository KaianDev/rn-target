import { StyleSheet } from "react-native"
import { colors, fontFamily, fontSize } from "@/theme"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  label: {
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
  },
  input: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.base,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[400],
  },
})
